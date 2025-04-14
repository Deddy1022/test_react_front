import { ErrorProps } from "@/core/types/props";

export function ErrorMessage({ errMessage }: ErrorProps) {
  return (
    <>
      <span className="text-[12px] text-red-600 font-semibold">{ errMessage }</span>
    </>
  )
}
