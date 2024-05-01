import { expandCollapse } from '@fs/core/general/helpers/animations/expand-collapse';
import {
  fadeIn,
  fadeInBottom,
  fadeInLeft,
  fadeInRight,
  fadeInTop,
  fadeOut,
  fadeOutBottom,
  fadeOutLeft,
  fadeOutRight,
  fadeOutTop,
} from '@fs/core/general/helpers/animations/fade';
import { shake } from '@fs/core/general/helpers/animations/shake';
import {
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideInTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
  slideOutTop,
} from '@fs/core/general/helpers/animations/slide';
import { zoomIn, zoomOut } from '@fs/core/general/helpers/animations/zoom';

export const fsAnimations = [
  expandCollapse,
  fadeIn,
  fadeInTop,
  fadeInBottom,
  fadeInLeft,
  fadeInRight,
  fadeOut,
  fadeOutTop,
  fadeOutBottom,
  fadeOutLeft,
  fadeOutRight,
  shake,
  slideInTop,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideOutTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
  zoomIn,
  zoomOut,
];
