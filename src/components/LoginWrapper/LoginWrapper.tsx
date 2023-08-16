import "./LoginWrapper.css";

interface LoginWrapperInterface {
  children: JSX.Element;
}
function LoginWrapper({ children }: LoginWrapperInterface) {
  return (
    <div className="Login_container Flex">
      <div className="Login_component_wrapper Flex-1 Flex Justify-content-center align-items-center">
        <div className="Login_component_container Flex Justify-content-center align-items-center">{children}</div>
      </div>
      <div className="Flex-1"></div>
    </div>
  );
}

export default LoginWrapper;
