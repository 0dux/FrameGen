import { colorSchemes } from "@/app/assets/assets";
import { Label } from "@/components/ui/label";

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <Label>Color Scheme</Label>
      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
            className={`relative rounded-lg transition-all ${
              value === scheme.id ? "ring-2 ring-primary scale-105" : "ring-1 ring-border"
            }`}
            title={scheme.name}
          >
            <div
              className={
                "flex h-8 rounded-md overflow-hidden hover:scale-105 transition-transform"
              }
            >
              {scheme.colors.map((color, i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Selected: {colorSchemes.find((scheme) => scheme.id === value)?.name}
      </p>
    </div>
  );
};

export default ColorSchemeSelector;

