export default async function Home() {
  // then, when done, return next frame
  return (
    <div className="p-4">
      <div className="mb-8">
        <img alt="logo" className="w-48" src="/logo.png" />
        <div>
          This is a frame that allows you to experience a portion of triviatech.
        </div>
      </div>
    </div>
  );
}
