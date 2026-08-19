import React from 'react'
import { ComingSoon } from '@/component/1-screens'
import { IconUsersGroup } from '@tabler/icons-react'

export default function page() {
    return (
        <div className="w-full h-auto sm:h-[89vh] pl-4 sm:pl-52 sm:py-4 pr-4 mt-2 sm:mt-0">
            <ComingSoon label="Jugadores" icon={<IconUsersGroup stroke={1.5} size={72} />} />
        </div>
    )
}
