import { TbCardsFilled } from "react-icons/tb";

const deckIcon = <TbCardsFilled className="icon" color="white" size={"20px"} />;

const Navbar = () => {
  return (
    <div className="w-full h-[80px] flex justify-center items-center">
      <div className="w-[1250px] h-full flex justify-between p-4">
        <div className="flex gap-2 justify-center items-center">
          <div className="flex justify-center items-center p-2 bg-blue-800 rounded-lg">{deckIcon}</div>
          <p className="font-bold text-sm">
            MyDevDeck
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;