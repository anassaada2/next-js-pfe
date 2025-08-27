export default function StateCard({ data }) {
    return (
        <div className="stats-single">
            <span className="stats-single__count counter">{data.count}</span>
            <p>{data.title}</p>
        </div>
    );
}
