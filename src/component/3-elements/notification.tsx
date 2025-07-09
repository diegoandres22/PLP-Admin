"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'
import { IconBell } from '@tabler/icons-react'
import React from 'react'

export const NotificationBell = () => {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger >
                <Button isIconOnly aria-label="Like" variant='light'>
                    <IconBell stroke={2} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="shadow">

                <DropdownItem key="1">Notificación 1</DropdownItem>
                <DropdownItem key="2">Notificación 2</DropdownItem>
                <DropdownItem key="3">Notificación 3</DropdownItem>
                <DropdownItem key="4">Notificación 4</DropdownItem>

            </DropdownMenu>
        </Dropdown>
    )
}
