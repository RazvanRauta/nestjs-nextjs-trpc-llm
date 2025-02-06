import type { IceBreakerDTO } from '@server/ice-breaker/dto/ice-breaker.dto';
import Image from 'next/image';

export const ProfileSummary = ({ data }: { data: IceBreakerDTO }) => {
  return (
    <div className="flex flex-col  justify-center gap-8 mt-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={data.linkedInData?.photoUrl || '/images/profile.jpg'}
          alt="avatar"
          width={96}
          height={96}
          className="w-50 h-50 rounded-full"
        />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {data.linkedInData?.firstName} {data.linkedInData?.lastName}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Summary
        </h2>
        <p className="text p-3">{data.result.summary}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Facts
        </h2>
        <ul className="list-disc p-3">
          {data.result.facts.map((fact, index) => (
            <li key={index} className="text">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
