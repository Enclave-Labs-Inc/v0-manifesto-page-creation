import { cn } from '@/lib/utils'

interface EnclaveLogoProps {
  theme?: 'light' | 'dark'
  className?: string
}

export default function EnclaveLogo({ theme = 'light', className }: EnclaveLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1160"
      height="192"
      viewBox="0 0 1160 192"
      role="img"
      aria-label="Enclave"
      className={cn(
        'h-[30px] w-auto sm:h-[34px]',
        theme === 'dark' && 'invert',
        className
      )}
    >
      <polygon points="54,36 118,36 93,67 29,67" fill="#676769" />
      <polygon points="54,84 158,84 133,115 29,115" fill="#363638" />
      <polygon points="54,132 198,132 173,163 29,163" fill="#0A0B0D" />
      <rect x="243" y="40" width="2" height="104" fill="#CDCED0" />
      <g fill="#0A0B0D">
        <g transform="translate(280.00,119.00) scale(0.03125,-0.03125)">
          <path d="M137 0V1409H1245V1181H432V827H1184V599H432V228H1286V0Z" />
        </g>
        <g transform="translate(328.69,119.00) scale(0.03125,-0.03125)">
          <path d="M995 0 381 1085Q399 927 399 831V0H137V1409H474L1097 315Q1079 466 1079 590V1409H1341V0Z" />
        </g>
        <g transform="translate(380.91,119.00) scale(0.03125,-0.03125)">
          <path d="M795 212Q1062 212 1166 480L1423 383Q1340 179 1179.5 79.5Q1019 -20 795 -20Q455 -20 269.5 172.5Q84 365 84 711Q84 1058 263.0 1244.0Q442 1430 782 1430Q1030 1430 1186.0 1330.5Q1342 1231 1405 1038L1145 967Q1112 1073 1015.5 1135.5Q919 1198 788 1198Q588 1198 484.5 1074.0Q381 950 381 711Q381 468 487.5 340.0Q594 212 795 212Z" />
        </g>
        <g transform="translate(433.12,119.00) scale(0.03125,-0.03125)">
          <path d="M137 0V1409H432V228H1188V0Z" />
        </g>
        <g transform="translate(478.22,119.00) scale(0.03125,-0.03125)">
          <path d="M1133 0 1008 360H471L346 0H51L565 1409H913L1425 0ZM739 1192 733 1170Q723 1134 709.0 1088.0Q695 1042 537 582H942L803 987L760 1123Z" />
        </g>
        <g transform="translate(530.44,119.00) scale(0.03125,-0.03125)">
          <path d="M834 0H535L14 1409H322L612 504Q639 416 686 238L707 324L758 504L1047 1409H1352Z" />
        </g>
        <g transform="translate(579.12,119.00) scale(0.03125,-0.03125)">
          <path d="M137 0V1409H1245V1181H432V827H1184V599H432V228H1286V0Z" />
        </g>
      </g>
    </svg>
  )
}
