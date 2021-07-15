const AuthButton = (props) => {
  return (
    <div>
      <button type={props.type} className="border rounded-full px-8 py-2 hover:ring-yellow-500" >
        {props.text}
      </button>
    </div>
  );
};

export default AuthButton;
