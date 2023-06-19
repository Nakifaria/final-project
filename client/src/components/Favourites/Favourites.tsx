import { ChangeEvent, useEffect, useState} from "react"
import { FavouriteItem } from "./FavouriteItem"
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router";
import { deleteFavs, setFavs } from "../../redux/slices/favSlice";
import { RootState } from "../../redux/store/store";
import { useParams } from "react-router-dom";
import { Dropdown } from "flowbite-react";

export const Favorites = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const [priceData, setFormData] = useState({ low: '', high: '' });
    const [sortOption, setSortOption] = useState('')
    const [dropdawnLabel, setDropdawnLabel] = useState('Сортировка')
    const [oldItems, setOldItems] = useState([])
    const items = useAppSelector((state: RootState) => state.favSlice.items)
    
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...priceData, [e.target.name]: e.target.value });
      };
      
    const favsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/favourites");
        const favData = await response.json();
        dispatch(setFavs(favData));
        setOldItems(favData)
      } catch (error) {
        console.log(error);
      }
    };

    
    const submitHandler = () => {
        // console.log(priceData);
        if (priceData.low && priceData.high) {
            dispatch(setFavs(oldItems))
            console.log(oldItems);
            const newItems = oldItems.filter((item) => (item.Item.price >= priceData.low && item.Item.price <= priceData.high));
            dispatch(setFavs(newItems));
            console.log(newItems);
            
        }}
        
        
        useEffect(() => {
            favsData()
          }, [])            

    
    const handlerDelete = async (itemId: number): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:3000/favourites/${itemId}`,{
                method: "DELETE",
                credentials: "include"
            })
            dispatch(deleteFavs(itemId))
        } catch (error) {
            console.log(error);
        }
    }

    const addItem = async (itemId: number): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:3000/favourites/${itemId}`,{
            method: "PUT",
            credentials: "include"
        })
        } catch (error) {
            console.log(error); 
        }
    }

    const compareItem = async (itemId: number): Promise<void> => {
      try {
          const response = await fetch(`http://localhost:3000/favourites/${itemId}`,{
          method: "PATCH",
          credentials: "include"
      })
      } catch (error) {
          console.log(error); 
      }
  }

    if (sortOption === 'popularity') {
        const newArr = JSON.parse(JSON.stringify(items))
       const newFavs = newArr.sort((a,b) => a.Item.order_count - b.Item.order_count)
       dispatch(setFavs(newFavs));
       setSortOption('')
       setDropdawnLabel('По популярности')
   } else if (sortOption === 'priceLow') {
      const newArr = JSON.parse(JSON.stringify(items))
      const newFavs = newArr.sort((a,b) => a.Item.price - b.Item.price)
      dispatch(setFavs(newFavs));
      setSortOption('')
      setDropdawnLabel('По цене (сначала дешевле)')
  } else if (sortOption === 'priceHigh') {
   const newArr = JSON.parse(JSON.stringify(items))
   const newFavs = newArr.sort((a,b) => b.Item.price - a.Item.price)
   dispatch(setFavs(newFavs));
   setSortOption('')
   setDropdawnLabel('По цене (сначала дороже)')
} else if (sortOption === 'nameAsc') {
   const newArr = JSON.parse(JSON.stringify(items))
   const newFavs = newArr.sort(( a, b ) => {
       if ( a.Item.name.toLowerCase() < b.Item.name.toLowerCase() ){
         return -1;
       }
       if ( a.Item.name.toLowerCase() > b.Item.name.toLowerCase() ){
         return 1;
       }
       return 0;
     }
   )
   console.log(newFavs);
   dispatch(setFavs(newFavs));
   setSortOption('')
   setDropdawnLabel('По названию (A-Я)')
} else if (sortOption === 'nameDesc') {
   const newArr = JSON.parse(JSON.stringify(items))
   const newFavs = newArr.sort((a,b) => 
   {
       if ( a.Item.name.toLowerCase() < b.Item.name.toLowerCase() ){
         return 1;
       }
       if ( a.Item.name.toLowerCase() > b.Item.name.toLowerCase() ){
         return -1;
       }
       return 0;
     })
   dispatch(setFavs(newFavs));
   setSortOption('')
   setDropdawnLabel('По названию (Я-А)')
} 

    return (
        <div className="pt-30 flex-col space-y-10">
            <div className="flex flex-row text-center items-center justify-center p-30 space-x-3">
                Цена <input
                onChange={changeHandler}
                value={priceData?.low}
                name="low"
              id="from"
              placeholder="От"
              className="rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />  <input
            onChange={changeHandler}
            type="text"
            value={priceData?.high}
            name="high"
            id="to"
            placeholder="До"
             className=" w-min rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" /> 
             <button className="max-h-10 shadow w-32 block border-blue-600 border-2 rounded-md focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white" onClick={submitHandler}>Фильтр</button> 
             <Dropdown color="light" label={dropdawnLabel}>
            <Dropdown.Item onClick={() => setSortOption('popularity')}>
              По популярности
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("priceLow")}>
              По цене (сначала дешевле)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("priceHigh")}>
              По цене (сначала дороже)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("nameAsc")}>
              По названию (А-Я)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("nameDesc")}>
              По названию (Я-А)
            </Dropdown.Item>
          </Dropdown>
            </div>
            <div className="flex flex-col  justify-center">
                {items && items.map((item) => (<FavouriteItem key={item.id} id={item.id} name={item.Item.name} price={item.Item.price} compareItem={compareItem} addItem={addItem} handlerDelete={handlerDelete} source={item.Item.img || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALAAvwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBgcFAQj/xABOEAABAwICAwcOCwYFBQAAAAABAAIDBBEFEgYhMRNBYXGBscEHFCIjMjZCUXJ0gpGy0SQzUlNiY2Rzg5OhNUOSs9LhJjRUlPAVhKPC8f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A3FCEIBRcTqes6CoqbfFRl36KUuVpT3t4nbb1rJ7JQV7EcTxeN2ZuKQxM3rxN6VzH41i2/j8TeKNgVJnq5a7GsRd13PeGRseS0dmdiNhJvrul7lMRfrqf+Jg6VBa5MaxLf0lcPJEfuUSXG8Rt3z1PJk6Aq0+GX/VzngMoCjyUzvnpieGY+5BYJsZxA7dJa88DXgcwUGoxatds0gxTkncOZcV9M4/vJDxSu/pTD6Q+OQ8G6H+lUdGbEa47ccxd3/dy+9c+qr60tIGKYiT9Kqk96jyUXjY/1k9Cjuora9zvxhyoj0uK4gzGI424hWi4Id8Jfr1b+tWShxzF6dgMOJVg1k265eL6+G4/RVGEW0lY3xBvsBWOBvaxy9KCxU2nOkVPq6/kkHie1r/1IC6lP1S8aj+NipZeOMg/oVTciUGINCp+qpKLdc4VGeFk5B9RaV0qbqn4VIbT0lXCeDI7pv8AossDUrLqtvcaYNlp9PNH5ttVJH95C4W/RdGn0mwOe25YpSk+IyAc6wjcmjY0DiFkZOF3KSmD6Ihqqeo+Inil8h4dzJ5Y/wBS68ek9gSQ6neDfe2HoWwKAQhCAQhCAXL0p728U80k9krqLl6Ud7eK+aS+yUHzZNV1NPp3Wx01RJE2adokyWu4WGrWOFXplM4gXqqnWPnSs+rATp3U5du7Ai/ktV+bu9hrjtyqUOdZs8Koqj+O73pqSji+eqOG87/elEzfLj9RTTzPvPj/AIT71FOVmDxU8Alzym5A1zP/AKlzHUsB2sceORx6VMlkqngB0wIG8Wn3qO8zDXukY/D/ALqhuHDqeaTLkDdV7uJKZxDDKamByta67SbgFPZpnbXxDiZfpTL8rwWOqGC+rU221EVJvfUwW3mfygrVTx3iaePnVaczJppuYvlaWgX4IgrhSx9pby861gY3NK3PgUoRJQjVREEa93JTBElCFBAMa83NTzCkGFB3upoy2k7T9Q/oWuBZX1Oo8ukjT9S/oWqLNUIQhAIQhALl6U97WK+Zy+wV1Fy9KO9rFvMpvYKD50goJKrTLEKlmYRwSNuchdmJaNWpXRrhbuX6hvxu9yrJqhBX1gjmo2OMnZjdXtfs1Zrav7Jf/U3b9VSf7l/uUFjdIAO5P8JHQmXyneafUuCcRJ2VNH/un/0pl9cXHXUUhPnDj/6oO4+X6CZMpDw9rcpabghy4b6366l/Pd/Sm3Yh9opPzT/SqO3UVRfI6SQMLybkuftKgPkhNrsaQHXGaYnZrXNfiJ3qmm5Hk9Cjmvdf/M0/rPuQNxOMumjHG13OGoG/7tXukj+Ds5edUDCHGXSymcTcude9737ArTKOL4Mzl51qBkRJQiUsRcCUIkRFEKWIVMbFwJxsKDnmHgSTBwLqbjwJJhQT9BIsmPNP1T+haQqJobFlxkH6p3Qr2s1QhCEAhCEAuZpP3t4t5lN7BXTXM0m728W8ym9goMCdJN11UAOrQ3P2OWNpZyb/AK0rdJt6WtHFC1RLxmtqrCG+cX+EkHZvje4E7lbbZH/uf7oHTJNvzV/5LU81uanjcTLI8tzOcXhv6WULKPkN1+Kp/upbGg0kRN7httR/5dBFq3yxMY/I9rHkta7dL6woDJZ3xjNJXbPCY3Xw8SfrGAPtfNa+u5soMLSIhaK/CKgG/r2cSBb3yfOVXKwJgvlB+Mqf4QlvB+acfxm+9NOB3oXfnt96oTgF3aZUIcSbvNyfIK1ikj+Ds5ecrKdGhfTXD27+6H2HLYKOP4Ozl5yrA3ufAltj4FIyJbWIhlsfAnmxDxJ1sdynmxoIxi4EkxcCm7mgxoJWirMuKk2/dO6FcFV9HG2xE/dnnCtAWaoQhCAQhCAXM0m728W8ym9grprmaTd7mK+ZTewUHzvuhFTOC4gZ9V6cEDVvE7UvO22uRnLTtTV3ddzlu6WzC2WoaAfRPcpy8v2nknj9yDwyM+ch5YGqXCR1lHs2avWopM28ascUsXuTsbrUrLk3trvx8CCNVHaudE6Es1vpCfNiPX4+NTqk3vZRYTKIwCaw6vCAI/QbFQ04w/ZPySmn7j9l/KKlPdJ9p/LumHOeDtn/ACSUC9Ex/jnDb/On+WVs9MztDeXnKxjRI/46w3b8cdur92VtdMO0N4zzpB7lSmt1pRC9aFUKY3Wn2tSIxrT7QgTZeFqd1JJQTcAFq8/dnoVjVewL/PH7s9CsKzVCEIQCEIQC5ukwvo5ivmc3sFdJc3STvexXzOb2Cg+bHSQtq6jO+macwvmBadm+d9L3anP7yjP4xHQlxum3eXKasNzashGXZvDeTwM/yq4+g09CCMZILbaM/jn3JyoMLaCIzSmKJrwd0YdhudV/ElvM42uq7cMISmutTtcLl4Nw0t2nXrQRpX00kNqWZ0wv2TjKH8wChwNBj7FjLfRlJ/8Ah4FKqqmeVlpzxAW8XjCgx5CwZjET9Kltb38aQOub9D/zpotOwNd+eh5jH+nP4VkyXRm5HW45bdCol6Ia9OsMAFu3H+WVtlN8Q3jPOsU0N7+8L+9Ow/VuW00x7S3jPOUDy9CTdegoh5ifaVGaU6HWQOkrwlIL0kuQdPATevP3Z5wrEq1o46+IOH1R5wrKooQhCAQhCAXO0i738T80l9grorn6QfsHEvNJfYKD5nzR9czj4NmuM2aZzHctk60MPgU/JWOSCXCaTspg2+oCDM3kISxJ43H0qX3oHMpt2MYPk1PvXoI63sAc+uwNrJpz4ra3QHgNOAlRkCJtra72sgjyZ2izyCd63/P+ak3FnEY/zAvs1hyXOdqjQtYY+x3DhyTubr4eFUOPLxvzjjjTRc4ay+bljXroxvAclQ4pGR3gseeKYdJQStDtenmF679td/LctkpnDcRxnnWNaH9jpzhh1/Gu2/duWv0zu0jjPOgmZl7mso4evc6IlNcnM6iNel50Egv1Jt0mpMukTL5UHe0WdmxJ/wB0ecK2KmaHSZsVlH1B9pquaihCEIBCEIBQMe/YmI+ay+yVPUHHNeC4gPs0nslB8yFjevJhZpdq2VDmnZquN5PsaR3LZb/RqgedNTkislBsRq7qmLxs3nBJJiA7I0o8uItQSDum8KrkliKjS00E7WumjzuFx2TiCNfAUCWn2B1CeJ5HQlgjcWnUBx6vWgYEUETQI4Gixve5J9ZKRE87kMznk72entzbQlSOBvYg8STAHZNQlHFJcfrs4lR46RnhPg5Y7JrNCT3VIeQqSTIPCqhxZD0JBdJ8ufliB6ECtE3W0yoHC2p52bO4K1imk7S3jPOVkmjerS6iJPhnet4BWoUz/g7eXnQdASL3Ooe6cKUJOFETQ9K3RQhIvTIgkOl1bVHkl4U0+RR5JCgtGgjy7GZh9md7TVfRsWedT118an82d7TVoaihCEIBCEIBQsa/Y9f5tJ7JU1Q8Y/ZNb5vJ7JQfM0rXGvnLWvPc3Mc3BvtOxK7c3fq28T2lMVW5mum3TcDqb3cJJ2fK30m8Owda/muYgkudMWnNJVnyo2kforB1PY4p8acwsZJV9bSCka+2uW9t/fALjyFVpuUjU2M+RVOPOlxF8bg5udrmm7S12scqC69UiB8uBUddWRRRzNkEEBDQHSRgG9/GNTeK5WdQOhyWJpb7D2ZZr966NfPVVuQ1M88xjblZury/K3xC+wKLEXsjAc6oHA6O9vUqE5WkamwkfRnKSWH5t9vG2ZKe5ru6c0+VTJl2437LrTlhLUCsABGlNJqJcHnb5JWkU78tOwHbrWeaKgHSujsBbO7Zs7kq/XszlPOoJG6JQkUQPSg5BMEi9zqK1yXmRDrnJlxXpcmyUFp6nX7ZqPNj7TVoqzrqc/tio82PtNWiooQhCAQhCAUXFRfDKwD5h/slSlGxL9nVX3L+YoPmCfP15KQJ7Wb3D2kbPknYvMzxt3f0ob8yRUmPr2XOIL6u7aWnZ8rfSQ1hNxk9GqcECyWnuiz06YptzYNtqO/kFqdGfwBP6NQ086CZt91YBwtjdzIGAGnZuHo1Dmr0RuOsMefJqiecpb3kbXSelSkpsmE63OpvThLVR4RKPAqR6THJHbBr+EDXvxg8yV2k9y2kPkuLUnIx2xg9GqcgkaKd9dKT8p+0fRKvDz2HKedUbRfsdK6XUe6dtNz3JV1kd2scvOoDMlhyi50rOgltcl51CEiVult9BLzJJcmoGzVMm50sUk0nyY2lx/RWXDNCMXq7Oq9zo2Hee7M/1D3oJnU314xU+bH2mrRlw9HtGaTBHPlhlllne3K57zqtt2BdxAIQhAIQhAKNiIJoKkeOJ/MVJSXtD2lrhcOFig+XZYHumMrJXta4C7dRF/HrCQ6CbaXxnyoQelbvUdTfRyZxc2mmhJ+ancAOTYufP1KcIf8AE1+IRekxw/VqDE3QO32Ux/CI6V4YXW+Ii9F7gtfl6kjde4Y24cElKHczgoM3UmxFvxOKUr/Ljc33oMtyvZtilHk1B6Ulz5doNWB5THLRpupdj7Pin0UvFKW84UCo6nWk0Z/yEcnkTtPuQUV8h33TelT35k0ZGHW58Ppwlqt02hekcNy7BKo8LAHcxXNqMDxWnPbcKxFnCaWS3rsqOfo40DSGkcABrNrbO5Ktsru1jl51X8Goar/rdPlpagvaSS0QuuNR3rK+YdofjWIxsPWvWzL631F2b/i2qCtlyVCHzPDIWPkedjWNLieQLS8M6m1DDZ+J1MlU/wCbZ2DB0n1q3YfhtDh8eShpIoG28BtieVBleFaEY3XZXTQto4z4U5s7+Hb67K34X1PsLpsr658tXINrScjPUNZ5SrhYWsiwQMUlHTUUO5UcEcLB4MbQEbq46tzcbd0PcpCZdG5t3MfrvqDtYHAg93XLHneLeMDXZBmAbc728k7jmYBI4k7TbUCk9bdncONuH9EC21AI7K4Ou4sdVkuN4kbmabhRzS3AG7P2X2b/AI09BGYwbvLydZJQf//Z'}  />             
                ))}
                <div>
            </div>
            </div>
        </div>
    )
}