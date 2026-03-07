import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faCartShopping,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { publicNavItems } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { MegaMenu } from "@/components/layout/mega-menu";
import { SearchBar } from "@/components/ui/search-bar";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Logo />
          <div className="order-3 lg:order-none lg:flex-1 lg:px-8">
            <SearchBar />
          </div>
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm">
              <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm">
              <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
              <FontAwesomeIcon icon={faUserCircle} className="h-6 w-6 text-primary" />
              <div className="hidden text-sm lg:block">
                <p className="font-semibold text-ink">Minh Anh</p>
                <p className="text-muted">Khách hàng</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="group relative">
            <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm">
              Danh mục
              <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 text-muted" />
            </button>
            <div className="hidden group-hover:block">
              <MegaMenu />
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-3">
            {publicNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-white hover:shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
