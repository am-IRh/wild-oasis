import { Toaster } from "react-hot-toast";

export default function Notification() {
  return (
    <Toaster
      gutter={12}
      containerStyle={{ margin: "8px" }}
      position="top-center"
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5999,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700",
        },
      }}
    />
  );
}
