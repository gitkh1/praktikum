import EventHandler from "./Events";

type PopUpProps = {
  formType: string;
  title: string;
  description: string;
  inputName: string;
  inputType: string;
  buttonTitle: string;
  events?: EventHandler;
};

export default PopUpProps;
