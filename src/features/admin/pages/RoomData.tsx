
import UploadFileImg from '../../auth/shared/UploadFileImg'
import DeleteConfirm from '../../auth/shared/DeleteConfirm'


export default function RoomData() {
  return (
    <>
      <UploadFileImg title="Choose a Room Image"></UploadFileImg>
     <DeleteConfirm title="this rooom?"></DeleteConfirm>
    </>
  )
}
