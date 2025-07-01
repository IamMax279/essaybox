//TODO: implement custom not found page
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-3xl font-bold mb-4 text-white">404 - Page Not Found</h1>
      <p className="text-white">The page you are looking for does not exist.</p>
    </div>
  );
}