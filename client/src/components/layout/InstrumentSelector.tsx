import Button from './Button';

const InstrumentSelector = () => {
  return (
    <>
      <div className="flex gap-x-4 text-foreground dark">
        <Button
          //   onClick={() => setIsSinglePlayer(true)}
          className="h-36 w-56 rounded-lg backdrop-blur-xl transition-colors duration-200 hover:bg-red-800"
        >
          right
        </Button>
        <Button
          className="h-36 w-56 rounded-lg backdrop-blur-xl transition-colors duration-200 hover:bg-red-800"
          //   onClick={onOpen}
        >
          left
        </Button>
      </div>
    </>
  );
};

export default InstrumentSelector;
