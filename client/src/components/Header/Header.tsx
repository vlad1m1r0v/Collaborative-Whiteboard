import AuthButton from '@/components/Header/AuthButton.tsx';

const Header = () => {
  return (
    <div>
      <header className="border-b-1 border-gray-200 shadow-sm">
        <div className="mx-auto max-w-screen-xl py-2 flex justify-between items-center">
          <div>{/*Left Container*/}</div>
          <AuthButton />
        </div>
      </header>
    </div>
  );
};

export default Header;