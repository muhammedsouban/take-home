"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeft } from "react-feather";

interface BreadcrumItemprops {
  label: string;
  icon?: ReactNode;
  href?: string;
  key: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumItemprops[] }) => {
  const Router = useRouter();
  const goBack = () => Router.back();
  return (
    <nav className="flex" aria-label="Breadcrumb" >
      <ol className="inline-flex items-center space-x-2 my-2">
        <li className="inline-flex items-center group">
          <span
            className="inline-flex cursor-pointer items-center text-xs font-medium text-gray-600 group-hover:text-secondary"
            onClick={goBack}
          >
            <div className="text-gray-600 group-hover:bg-secondary rounded mr-2 p-[1px]">
              <ArrowLeft size={12} className="text-light" />
            </div>
            Back
          </span>
        </li>
        <span className="font-bold text-gray-600">-</span>
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-secondary "
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.key}>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {index === items.length - 1 || !item.href ? (
                <span className="ml-1 text-xs font-medium text-secondary md:ml-2">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item?.href}
                  className="ml-1 text-xs font-medium text-gray-600 hover:text-secondary md:ml-2"
                >
                  {item.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
