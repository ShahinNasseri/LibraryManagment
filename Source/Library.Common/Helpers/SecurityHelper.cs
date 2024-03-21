using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Helpers
{
    public static class SecurityHelper
    {
        private static string defaultEncryptKey = "@ska%225LkawtHG";
        public static string GenerateHash(string input, string salt)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(input + salt);

            using (var sha256Hash = SHA256.Create())
            {
                byte[] hash = sha256Hash.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }

        }

        public static bool AreEqual(string plainTextInput, string hashedInput, string salt)
        {
            string newHashedPin = GenerateHash(plainTextInput, salt);
            return newHashedPin.Equals(hashedInput);
        }

        public static string Encrypt(string data, string? key)
        {
            ArgumentNullException.ThrowIfNull(data);
            key ??= defaultEncryptKey;

            using (var cipher = Aes.Create())
            {
                cipher.Mode = CipherMode.CBC; // Keeping the CBC mode
                cipher.Padding = PaddingMode.PKCS7; // Keeping PKCS7 padding
                cipher.KeySize = 128; // Using 128 directly for clarity
                cipher.BlockSize = 128; // Using 128 directly for clarity

                // Key processing
                var pwdBytes = Encoding.UTF8.GetBytes(key);
                var keyBytes = new byte[16]; // 16 bytes for 128 bit key
                var len = pwdBytes.Length;

                if (len > keyBytes.Length)
                    len = keyBytes.Length;

                Array.Copy(pwdBytes, keyBytes, len);
                cipher.Key = keyBytes;
                cipher.IV = keyBytes; // Setting IV to keyBytes may not be recommended for security reasons in real applications

                // Encrypting
                using (var transform = cipher.CreateEncryptor())
                {
                    var plainText = Encoding.UTF8.GetBytes(data);
                    return Convert.ToBase64String(transform.TransformFinalBlock(plainText, 0, plainText.Length));
                }
            }
        }

        public static string Decrypt(string data, string? key)
        {
            key = key ?? defaultEncryptKey;
            ArgumentNullException.ThrowIfNull(data);

            using (var cipher = Aes.Create())
            {
                cipher.Mode = CipherMode.CBC; // Keeping the CBC mode
                cipher.Padding = PaddingMode.PKCS7; // Keeping PKCS7 padding
                cipher.KeySize = 128; // Using 128 directly for clarity
                cipher.BlockSize = 128; // Using 128 directly for clarity

                // Key processing
                var pwdBytes = Encoding.UTF8.GetBytes(key);
                var keyBytes = new byte[16]; // 16 bytes for 128 bit key
                var len = pwdBytes.Length;

                if (len > keyBytes.Length)
                    len = keyBytes.Length;

                Array.Copy(pwdBytes, keyBytes, len);
                cipher.Key = keyBytes;
                cipher.IV = keyBytes; // Setting IV to keyBytes may not be recommended for security reasons in real applications

                // Decrypting
                var encryptedData = Convert.FromBase64String(data);
                using (var decryptor = cipher.CreateDecryptor())
                {
                    var plainText = decryptor.TransformFinalBlock(encryptedData, 0, encryptedData.Length);
                    return Encoding.UTF8.GetString(plainText);
                }
            }

        }
    }
}
