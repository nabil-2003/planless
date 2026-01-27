import Link from "next/link"



type ItemsBreadType = {
  href: string;
  label: string;
}


const Breadcrumb = ({ items }: { items: ItemsBreadType[] }) => {

  return (
    <div className="text-sm flex breadcrumbs  bg-[#F2F4FF] ">

      {
        items?.map((it,i) =>


          <BreadcrumbItem  key={i} href={it.href} label={it.label} />

        )
      }
    </div>)
}


export default Breadcrumb;


const BreadcrumbItem = ({ href, label }: { href: string; label: string }) => (
  <div>
    <Link href={href} className="text-black flex gap-2 text-sm justify-center items-center font-bold  p-2">
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
        d="M5.75 0.75L0.75 5.75L5.75 10.75" stroke="#575757" 
        strokeWidth="1.5" strokeLinecap="round" 
        strokeLinejoin="round" />
      </svg>

      <span className="text-[#575757]">{label.split("")}</span>
    </Link>
  </div>
);
