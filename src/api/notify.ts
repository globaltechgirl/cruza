import { notifications } from "@mantine/notifications";
import { getErrorMessage } from "@/api/error";

const shownErrors = new Set<string>();

export function notifyErrorOnce(error: any) {
  const message = getErrorMessage(error);

  if (shownErrors.has(message)) return;

  shownErrors.add(message);

  notifications.show({
    title: "Error",
    message,
    color: "red",
  });
}
