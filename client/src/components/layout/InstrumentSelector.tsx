import Button from './Button';

const InstrumentSelector = () => {
  const selectLeft = () => {
    console.log('left');
  };
  const selectRight = () => {
    console.log('right');
  };

  return (
    <>
      <div className="flex gap-x-4 text-foreground dark">
        <Button
            onClick={() => selectLeft()}
          className="h-36 w-56 rounded-lg backdrop-blur-xl transition-colors duration-200 hover:bg-red-800"
        >
          right
        </Button>
        <Button
          className="h-36 w-56 rounded-lg backdrop-blur-xl transition-colors duration-200 hover:bg-red-800"
            onClick={() => selectRight()}
        >
          left
        </Button>
      </div>
    </>
  );
};

export default InstrumentSelector;
