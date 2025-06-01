import { useDialog } from "../DialogContext";
import { useTranslation } from "../TranslationContext";

const AlertDialog = () => {
  const { dialogProps, closeDialog } = useDialog();
  const { t } = useTranslation();

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold">{dialogProps.message}</h2>
      <button onClick={closeDialog} className="primary w-full">{t("OK")}</button>
    </div>
  );
};

export default AlertDialog;
