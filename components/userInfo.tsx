const UserInfo = ({
  username,
  fullname,
}: {
  username: string | undefined;
  fullname: string | undefined;
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm">{fullname}</span>
      <span className="text-xs text-gray-400 font-medium">
        @{username}
      </span>
    </div>
  );
};

export default UserInfo;
