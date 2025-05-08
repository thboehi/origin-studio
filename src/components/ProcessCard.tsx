interface ProcessCardProps {
    title: string;
    description: string;
    number: number;
}

export default function ProcessCard({ title, description, number }: ProcessCardProps) {
    return (
      <>
        <div className="flex flex-col items-center lg:items-start justify-center gap-4 lg:flex-row">
          <div className="mt-2 inline-flex items-center justify-center w-10 h-10 text-lg text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            {number}
          </div>
          <div className="flex w-full min-w-0 flex-col items-center lg:items-start justify-center gap-0 text-base">
            <h3 className="text-center lg:text-left mb-2 py-2 text-lg font-bold leading-6 text-neutral-200">
              {title}
            </h3>
            <p className="text-neutral-400 max-w-md text-center lg:text-left">
              {description}
            </p>
          </div>
        </div>
      </>
    )
  }