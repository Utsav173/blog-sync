import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Hemder = ({ blogsData }: { blogsData: any }) => {
  return (
    <header className="bg-auto space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <Navbar />
      <SearchBar blogsData={blogsData} />
    </header>
  );
};

export default Hemder;
