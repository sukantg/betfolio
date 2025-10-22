export function Stats() {
  const stats = [
    { value: "12x", label: "Average Multiplier", sublabel: "on winning parlays" },
    { value: "$2.4M", label: "Total Volume", sublabel: "locked in parlays" },
    { value: "1,247", label: "Active Parlays", sublabel: "across all markets" },
    { value: "98%", label: "Settlement Speed", sublabel: "within 1 hour" },
  ]

  return (
    <section className="border-b border-border/40 bg-muted/30">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-sm font-medium text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
