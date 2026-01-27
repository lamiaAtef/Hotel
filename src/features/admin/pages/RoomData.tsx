import DeleteConfirm from "../components/DeleteConfirm";
import UploadFileImg from "../components/UploadFileImg";

export default function RoomData() {
  return (
    <>
      <UploadFileImg title="Choose a Room Image"></UploadFileImg>
     <DeleteConfirm title="this rooom?"></DeleteConfirm>
    </>
  )
}