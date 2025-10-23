// Format salary in PKR
export const formatPKRS = (salary) => {
  if (!salary && salary !== 0) return "Rs. 0";
  return `Rs. ${Number(salary).toLocaleString("en-PK")}`;
};

// Format mobile number
export const formatMobileNumber = (number) => {
  if (!number) return "N/A";
  const cleaned = number.replace(/\D/g, "");

  if (cleaned.length === 11 && cleaned.startsWith("03")) {
    return cleaned.replace(/(\d{4})(\d{7})/, "0$1-$2");
  }

  if (cleaned.length === 12 && cleaned.startsWith("923")) {
    return cleaned.replace(/92(\d{3})(\d{7})/, "+92 $1-$2");
  }

  return number;
};

// Format date as "01-Aug-2024"
export const formatDateOnly = (isoDateString) => {
  if (!isoDateString) return "N/A";
  const date = new Date(isoDateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTimeOnly = (isoDateString) => {
  if (!isoDateString) return "N/A";
  const date = new Date(isoDateString);
  if (isNaN(date)) return "Invalid Date";

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 👉 agar "01:05 PM" chahiye
  });
};

export const bufferToBase64 = (buffer, type = "image/png") => {
  if (!buffer || !buffer.data) return "";
  const base64 = btoa(
    new Uint8Array(buffer.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return `data:${type};base64,${base64}`;
};

export const openPdfFromBuffer = (buffer) => {
  if (!buffer || !buffer.data) return;
  const byteArray = new Uint8Array(buffer.data);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
};




