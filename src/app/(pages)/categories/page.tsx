import React from "react";
import Link from "next/link";
import Head from "next/head";

const CategoriesPage = () => {
  const categories = [
    {
      id: 1,
      title: "Education",
      count: 1245,
      icon: "🎓",
    },
    {
      id: 2,
      title: "Development",
      count: 876,
      icon: "💻",
    },
    {
      id: 3,
      title: "Sales & Support",
      count: 932,
      icon: "📞",
    },
    {
      id: 4,
      title: "Marketing",
      count: 567,
      icon: "📢",
    },
    {
      id: 5,
      title: "Content Creation",
      count: 421,
      icon: "✍️",
    },
    {
      id: 6,
      title: "Finance",
      count: 689,
      icon: "💰",
    },
    {
      id: 7,
      title: "Banking",
      count: 345,
      icon: "🏦",
    },
    {
      id: 8,
      title: "Computer Operator",
      count: 278,
      icon: "⌨️",
    },
    {
      id: 9,
      title: "Tele Caller",
      count: 512,
      icon: "📱",
    },
    {
      id: 10,
      title: "Nursing/Medical",
      count: 834,
      icon: "🏥",
    },
    {
      id: 11,
      title: "Delivery",
      count: 456,
      icon: "🚚",
    },
    {
      id: 12,
      title: "Graphic Designer",
      count: 389,
      icon: "🎨",
    },
    {
      id: 13,
      title: "Data Entry",
      count: 672,
      icon: "📊",
    },
    {
      id: 14,
      title: "Retail",
      count: 723,
      icon: "🛒",
    },
    {
      id: 15,
      title: "Helper/Peon/Drivers",
      count: 589,
      icon: "👷",
    },
    {
      id: 16,
      title: "Security",
      count: 412,
      icon: "🛡️",
    },
    {
      id: 17,
      title: "Hotel Jobs",
      count: 378,
      icon: "🏨",
    },
    {
      id: 18,
      title: "HR Executive",
      count: 267,
      icon: "📋",
    },
    {
      id: 19,
      title: "Technician",
      count: 498,
      icon: "🔧",
    },
  ];

  return (
    <>
      <Head>
        <title>All Job Categories | Job Portal</title>
        <meta
          name="description"
          content="Browse all job categories available in our portal"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Job Categories
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Browse through our comprehensive list of job categories to find
              your perfect career path
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              // <Link
              //   key={category.id}
              //   href={`/categories/${category.id}`}
              //   className="group block"
              // >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{category.icon}</span>
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    {category.count.toLocaleString()} jobs available
                  </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center text-blue-600 font-medium group-hover:underline">
                    View jobs
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              // </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Try our advanced job search to find more specific opportunities
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Explore All Jobs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-3 -mr-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
