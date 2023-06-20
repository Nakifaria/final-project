import { IPack } from '../../../components/Home/itemCard';

export const addToLocalStorage = (id: number, packName: string) => {
  const pack = localStorage.getItem(packName);

  if (!pack) {
    localStorage.setItem(
      packName,
      JSON.stringify({
        items: [id],
      })
    );
  } else {
    const updated: IPack = JSON.parse(pack);

    updated.items.push(id);

    localStorage.setItem(packName, JSON.stringify(updated));
  }
};

export const removeFromLocalStorage = (id: number, packName: string) => {
  const pack = localStorage.getItem(packName);

  const updated: IPack = pack && JSON.parse(pack);

  const spliceIndex = updated.items.indexOf(id);

  updated.items.splice(spliceIndex, 1);

  localStorage.setItem(packName, JSON.stringify(updated));
};
