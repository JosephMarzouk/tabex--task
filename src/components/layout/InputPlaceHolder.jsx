

const InputPlaceHolder = ({ email, password, name }) => {
  return (
    <div className="bg-surface rounded p-2">
      <p className="font-medium text-subtle">{name}</p>
      <p>{email}</p>
      <p>{password}</p>
    </div>
  );
};

export default InputPlaceHolder;