export class Status {
  constructor(readonly status: string) {}

  get title(): string {
    switch (this.status) {
      case "waiting-to-confirm":
        return "รอการยืนยัน";
      case "confirm":
        return "ยืนยันแแล้ว";
      case "reject":
        return "ปฏิเสธ";
      case "close":
        return "ปิดงาน";
      case "cancel":
        return "ยกเลิก";
      default:
        return "ยกเลิก";
    }
  }

  get isCancel(): boolean {
    return this.status == "cancel";
  }

  get isConfirm(): boolean {
    return this.status == "confirm";
  }

  get isReject(): boolean {
    return this.status == "reject";
  }

  get isWaiting(): boolean {
    return this.status == "waiting-to-confirm";
  }

  get isClose(): boolean {
    return this.status == "close";
  }
}
