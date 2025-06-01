import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../TranslationContext";

const AccountNav = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "account";
  }

  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full ";
    if (type === subpage) {
      classes += "bg-blue-500 text-white";
    } else {
      classes += "bg-blue-200 text-blue-300";
    }
    return classes;
  }

  return (
    <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
      <Link className={linkClasses("account")} to={"/account"}>
        {t("My account")}
      </Link>
      <Link className={linkClasses("profile")} to={"/account/profile"}>
        {t("My profile")}
      </Link>
      <Link className={linkClasses("post")} to={"/account/post"}>
        {t("My posts")}
      </Link>
      <Link className={linkClasses("pet")} to={"/account/pet"}>
        {t("My pets")}
      </Link>
      <Link className={linkClasses("order")} to={"/account/order"}>
        {t("My orders")}
      </Link>
      <Link className={linkClasses("chat")} to={"/account/chat"}>
        {t("My chat")}
      </Link>
    </nav>
  );
};

export default AccountNav;
