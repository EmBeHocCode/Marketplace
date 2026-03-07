import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Card } from "@/components/ui/card";

const footerGroups = [
  {
    title: "Danh mục dịch vụ",
    links: [
      { label: "VPS", href: "/products?type=VPS" },
      { label: "Cloud", href: "/products?type=CLOUD" },
      { label: "Gift Card", href: "/products?type=GIFTCARD" },
      { label: "Thẻ Game", href: "/products?type=GAMECARD" }
    ]
  },
  {
    title: "Chính sách",
    links: [
      { label: "Điều khoản", href: "/policies" },
      { label: "Bảo mật", href: "/policies#bao-mat" },
      { label: "Hoàn tiền", href: "/policies#hoan-tien" }
    ]
  },
  {
    title: "Liên hệ",
    links: [
      { label: siteConfig.contactEmail, href: "/contact" },
      { label: siteConfig.hotline, href: "/contact" },
      { label: "Ticket hỗ trợ", href: "/support" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="pb-8">
      <Card className="rounded-[36px] bg-ink text-white">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">MeowMarket</h3>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              Marketplace dịch vụ số cho người dùng Việt với trải nghiệm mua hàng rõ ràng,
              hiện đại và đáng tin cậy.
            </p>
            <div className="flex gap-3 text-sm text-slate-300">
              {siteConfig.socials.map((social) => (
                <Link key={social.label} href={social.href}>
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4 className="text-base font-semibold">{group.title}</h4>
                <div className="space-y-2 text-sm text-slate-300">
                  {group.links.map((link) => (
                    <Link key={link.label} href={link.href} className="block">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
          Copyright {new Date().getFullYear()} MeowMarket. All rights reserved.
        </div>
      </Card>
    </footer>
  );
}
