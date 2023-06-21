import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IEmptyProps {
  title?: string;
}

export const Empty: FC<IEmptyProps> = ({ title }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  console.log(pathname);

  if (pathname === '/search/') {
    return (
      <div className="flex flex-col w-full items-center gap-2">
        <span className="text-xl">Ничего не найдено,</span>
        <span className="text-xl">
          попробуйте ввести другой поисковый запрос.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center gap-5">
      <span>в {title} пока ничего нет</span>
      <button onClick={() => navigate('/catalog')} className="btn w-1/4">
        перейти в каталог
      </button>
    </div>
  );
};
