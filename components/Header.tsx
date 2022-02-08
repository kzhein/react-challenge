const Header = () => {
  return (
    <div className='pt-6'>
      <h1 className='text-4xl font-medium text-center'>TCG Marketplace</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png'
        className='mx-auto'
        alt='Logo'
      />
    </div>
  );
};

export default Header;
