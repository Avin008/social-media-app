const UserInfo = ({
  username,
  fullName,
}: {
  username: string;
  fullName: string;
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm">{fullName}</span>
      <span className="text-xs text-gray-400 font-medium">
        @{username}
      </span>
    </div>
  );
};

export default UserInfo;
