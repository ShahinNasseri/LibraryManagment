import { AgPromise, IAfterGuiAttachedParams, IFilterComp, IFilterParams, RowNode } from 'ag-grid-community';

export interface CustomFilterParams extends IFilterParams {
    trueLabel: string;
    falseLabel: string;
}

export class CustomBooleanFilter implements IFilterComp {
  
    private params: CustomFilterParams | undefined;
    private filterValue: boolean | null= null;
    private gui: HTMLElement | undefined;

    public init(params: CustomFilterParams): void {
        this.params = params;
        this.gui = document.createElement('div');

        // Create radio buttons with custom labels
        this.addFilterButtons(params);

        // Create Reset and Apply buttons
        this.addResetAndApplyButton();
    }

    private addFilterButtons(params: CustomFilterParams) {
        const radioGroup = document.createElement('div');
        radioGroup.classList.add('custom-boolean-filter');
        radioGroup.innerHTML = `
            <label class="custom-radio">
                <input type="radio" name="filter" value="true">
                <span>${params.trueLabel}</span>
            </label>
            <label class="custom-radio">
                <input type="radio" name="filter" value="false">
                <span>${params.falseLabel}</span>
            </label>
        `;

        this.gui!.appendChild(radioGroup);
    }

    private addResetAndApplyButton() {
        const buttonsContainer: any = document.createElement('div');
        buttonsContainer.classList.add('custom-boolean-filter-reset-and-apply');
        buttonsContainer.innerHTML = `
            <button class="ag-button ag-standard-button ag-filter-apply-panel-button" id="resetButton">Restore</button>
            <button class="ag-button ag-standard-button ag-filter-apply-panel-button" id="applyButton">Apply</button>
        `;

        // Event listeners for buttons
        buttonsContainer.querySelector('#resetButton').addEventListener('click', () => this.resetFilter());
        buttonsContainer.querySelector('#applyButton').addEventListener('click', () => this.applyFilter());

        this.gui!.appendChild(buttonsContainer);

        // Event listener for radio buttons
        this.gui!.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target && target.name === 'filter') {
                const val: any = target.value.toLowerCase() === 'true';
                this.setFilter(val);
            }
        });
    }

    private resetFilter(): void {
        this.filterValue = null;
        this.gui!.querySelectorAll('input[type="radio"]').forEach(radio => {
            (radio as HTMLInputElement).checked = false;
        });
        this.params!.filterChangedCallback();
    }

    private applyFilter(): void {
        this.params!.filterChangedCallback();
    }


    private setFilter(value: boolean): void {
        this.filterValue = value;
    }

    public getGui(): HTMLElement {
        return this.gui!;
    }

    public doesFilterPass(params: any): boolean {
        const value = this.params!.valueGetter(params.node);
        return value === this.filterValue;
    }

    public isFilterActive(): boolean {
        return this.filterValue !== null;
    }

    public getModel(): any {
        return {filterType: 'boolean', filter: this.filterValue};
        // return this.filterValue;
    }

    public setModel(model: any): void {
        this.filterValue = model;
    }

    public destroy(): void {
        // Clean up if necessary
    }

    public onNewRowsLoaded(): void {
        // Handle new rows if necessary
    }

    public onAnyFilterChanged(): void {
        // Respond to external filter changes if necessary
    }

    public getModelAsString(model: any): string {
        if(this.filterValue != null){
            return (this.filterValue == false ? this.params!.falseLabel : this.params!.trueLabel);
        }

        return '';
    }

    public afterGuiAttached(params?: IAfterGuiAttachedParams): void {
        // Handle GUI attachment if necessary
    }

    public afterGuiDetached(): void {
        // Handle GUI detachment if necessary
    }

    // Implement other necessary methods like getModel, setModel, etc.
}

// Usage in column definition with custom labels
// const columnDefs = [
//     {
//         headerName: 'Status',
//         field: 'statusField',
//         filter: CustomBooleanFilter,
//         filterParams: {
//             trueLabel: 'Active',   // Custom label for true
//             falseLabel: 'DeActive' // Custom label for false
//         },
//         // other properties...
//     },
//     // other columns...
// ];
