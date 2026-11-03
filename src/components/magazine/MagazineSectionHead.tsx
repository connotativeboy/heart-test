/** 杂志风区块标题：编号 + 衬线标题 + 虚线 */
export default function MagazineSectionHead({
  no,
  title,
}: {
  no: string
  title: string
}) {
  return (
    <div className="mag-sec-head">
      <span className="mag-sec-no">{no}</span>
      <h2>{title}</h2>
      <span className="mag-sec-line" aria-hidden="true" />
    </div>
  )
}
