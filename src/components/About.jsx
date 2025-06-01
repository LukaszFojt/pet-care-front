import { useTranslation } from "../TranslationContext";
import aboutImage from "../assets/about-image.png";

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              {t("What drives us?")}
            </h2>
            <p className="text-gray-800 text-lg mb-4">
              {t(
                "Our goal is to combine love for animals with the need for safe care. We want to create a space where pet owners can confidently entrust their dog, cat, or other animal to trusted caregivers. Our mission is not only to provide safety and comfort to animals, but also joy to both them and their caregivers."
              )}
            </p>
            <p className="text-gray-800 text-lg mb-4">
              {t(
                "We believe every animal deserves care, attention, and love at the highest level, and every caregiver deserves trust and the opportunity to share their passion for animals. Thanks to our platform, caregivers and pet owners find themselves in one place, making it easier to build a relationship based on trust, understanding, and love for animals."
              )}
            </p>
            <p className="text-gray-800 text-lg">
              {t(
                "We want each interaction to be a step towards greater comfort and happiness — for animals and their owners. Our goal is not only to offer services, but also to build a community where everyone feels safe and happy."
              )}
            </p>
          </div>

          <div className="flex-1 max-w-md">
            <img
              src={aboutImage}
              alt="Man holding dogs"
              className="rounded-xl w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
