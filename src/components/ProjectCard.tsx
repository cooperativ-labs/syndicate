import Card from './cards/Card';
import React from 'react';
import { useRouter } from 'next/router';

export type ProjectCardProps = {
  projectName: string;
  shortDescription: string;
  title: string;
  slug?: string;
  id: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ ...props }) => {
  const router = useRouter();
  const { projectName, shortDescription, title, id } = props;
  return (
    <div
      onClick={() => {
        window.sessionStorage.setItem('CHOSEN_PROJECT', id);
        router.push(`/syndications/${id}`);
      }}
    >
      <Card className="p-6 rounded-lg hover:shadow-xl cursor-pointer md:w-96">
        <h1 className="text-lg font-bold">{projectName}</h1>
        <div className="text-xs text-gray-600 mb-4">Role: {title}</div>
        <div className="mb-6">
          <div className="text-sm font-bold text-gray-800">{shortDescription}</div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;
('0x2779');
