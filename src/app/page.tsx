import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to Crypto Dashboard
        </h1>

        <p className="text-xl md:text-2xl opacity-80">
          Your go-to place for cryptocurrency charts and data
        </p>

        <div className="h-40 m-40 flex flex-col items-center justify-center space-y-4">
          <Link href="/charts">
            <span className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
              View Charts
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
