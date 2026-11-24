import React from 'react';
import { BoardingPassInvitation } from '@/components/invitation-boardingpass';
import { elianserEsraData } from '@/lib/data';

export default function BoardingPassPreviewPage() {
  return <BoardingPassInvitation data={elianserEsraData} guestName="Tamu Undangan" />;
}
