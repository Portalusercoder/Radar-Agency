/** Display heading in the Work/Blog style: italic serif first letter in English, second line indented. */
export function WorkHeading({ lines, isAr }: { lines: string[]; isAr: boolean }) {
  return (
    <h1 className="work-show__title">
      {lines.map((line, index) => (
        <span key={line} className={`work-show__line${index ? " work-show__line--indent" : ""}`}>
          {isAr ? (
            line
          ) : (
            <>
              <em>{line.charAt(0)}</em>
              {line.slice(1)}
            </>
          )}
        </span>
      ))}
    </h1>
  );
}
