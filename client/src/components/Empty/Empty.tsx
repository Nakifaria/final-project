import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IEmptyProps {
  title: string;
}

export const Empty: FC<IEmptyProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center gap-5">
      <span>в {title} пока ничего нет</span>
      <button onClick={() => navigate('/catalog')} className="btn w-1/4">
        перейти в каталог
      </button>
    </div>
  );
};
