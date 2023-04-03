import React, { FC } from 'react';

type RetrievalIssueIssueProps = {
  className?: string;
};

const RetrievalIssueIssue: FC<RetrievalIssueIssueProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex justify-center text-xl text-green-600 font bold">{`Unable to Retrieve Share Information`}</div>
      <div className="flex justify-center">
        {`   Don't worry, your shares are safe. We just can't see them at the moment.`}
      </div>
    </div>
  );
};

export default RetrievalIssueIssue;
