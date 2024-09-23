import {
  MessengerConversation,
  MessengerConversationType,
} from "@/models/messenger-conversation";
import { AxiosInstance } from "axios";
import httpRequest, {
  ApiBooleanResponse,
  ApiDataListResponse,
  ApiDataObjectResponse,
  ApiLoginResponse,
  ApiNumberResponse,
  ApiRegisterLoginResponse,
  ApiRegisterResponse,
  ApiResponse,
  ApiTextResponse,
  ApiUploadResponse,
} from "./http-request.service";
import { WorkBookingFormData } from "@/form-data/work-booking.form-data";
import moment from "moment";

export class ApiService {
  request: AxiosInstance;

  constructor(axiosInstance = httpRequest) {
    this.request = axiosInstance;
  }
}

export class ConfigurationApiService extends ApiService {
  public async getConfigurations(): Promise<ApiDataListResponse> {
    const response = await this.request.get(`/configurations`);
    return response.data;
  }
}

export class MasterDataApiService extends ApiService {
  public async getProvinces(): Promise<ApiDataListResponse> {
    const response = await this.request.get(`/provinces`);
    return response.data;
  }

  public async getWorkTypes(): Promise<ApiDataListResponse> {
    const response = await this.request.get(`/work-types`);
    return response.data;
  }
}

export class AuthApiService extends ApiService {
  public async doRequestLogin({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }): Promise<ApiLoginResponse> {
    const formData = new FormData();
    formData.append("email", email ?? "");
    formData.append("password", password ?? "");

    const response = await this.request.post(`/auth/login`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async doRequestRegister({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ApiRegisterResponse> {
    const formData = new FormData();
    formData.append("name", email.split("@").shift() || "");
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    const response = await this.request.post(`/auth/register`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async doRequestLogout(token: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("token", token);

    const response = await this.request.post(`/auth/revoke-token`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async getUser(): Promise<ApiDataObjectResponse> {
    const response = await this.request.get(`/auth/user`);
    return response.data;
  }
}

export class UploadApiService extends ApiService {
  public async doUploadOriginalImage(
    file: Blob | { uri: string; type: string; name: string } | undefined
  ): Promise<ApiUploadResponse> {
    const formData = new FormData();
    formData.append("image", file as any);

    const response = await this.request.post(
      `/upload/original-image`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async doUploadImage(
    file: Blob | { uri: string; type: string; name: string } | undefined
  ): Promise<ApiUploadResponse> {
    const formData = new FormData();
    formData.append("image", file as any);

    const response = await this.request.post(`/upload/image`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async doUploadDocument(file: Blob): Promise<ApiUploadResponse> {
    const formData = new FormData();
    formData.append("document", file);

    const response = await this.request.post(`/upload/document`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export class MessengerApiService extends ApiService {
  public async getLatestConversations({
    id,
  }: {
    id: number;
  }): Promise<ApiDataListResponse> {
    const response = await this.request.get(
      `/messenger/channel/${id}/conversations`
    );
    return response.data;
  }

  public async getLatestMobilePhoneConversations({
    id,
    mobilePhone,
  }: {
    id: number;
    mobilePhone: string;
  }): Promise<ApiDataListResponse> {
    const response = await this.request.get(
      `/messenger/mobile-phone-channel/${id}/${mobilePhone}/conversations`
    );
    return response.data;
  }

  public async getLastConversationSeen({
    channelId,
  }: {
    channelId: number;
  }): Promise<ApiDataListResponse> {
    const response = await this.request.get(
      `/messenger/channel/${channelId}/conversations/last`
    );
    return response.data;
  }

  public async getLastMobilePhoneConversationSeen({
    channelId,
    mobilePhone,
  }: {
    channelId: number;
    mobilePhone: string;
  }): Promise<ApiDataListResponse> {
    const response = await this.request.get(
      `/messenger/mobile-phone-channel/${channelId}/${mobilePhone}/conversations/last`
    );
    return response.data;
  }

  public async updateConversationSeen(
    messenger: MessengerConversation
  ): Promise<ApiDataListResponse> {
    const response = await this.request.post(
      `/messenger/channel/${messenger.channelId}/conversations/${messenger.id}/seen`
    );
    return response.data;
  }

  public async submitNewConversation({
    id,
    content,
    localCodeId,
    type,
  }: {
    id: number;
    content: string;
    localCodeId: string;
    type: MessengerConversationType;
  }): Promise<ApiDataObjectResponse> {
    const formData = new FormData();
    formData.append("local_code_id", localCodeId);
    formData.append("content", content);
    formData.append("type", type);
    const response = await this.request.post(
      `/messenger/channel/${id}/conversations`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async submitNewMobilePhoneConversation({
    id,
    mobilePhone,
    content,
    localCodeId,
    type,
  }: {
    id: number;
    mobilePhone: string;
    content: string;
    localCodeId: string;
    type: MessengerConversationType;
  }): Promise<ApiDataObjectResponse> {
    const formData = new FormData();
    formData.append("local_code_id", localCodeId);
    formData.append("content", content);
    formData.append("type", type);
    const response = await this.request.post(
      `/messenger/mobile-phone-channel/${id}/${mobilePhone}/conversations`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async doCreateNewMobilePhoneChannel(params: {
    mobilePhone: string;
  }): Promise<ApiDataObjectResponse> {
    const formData = new FormData();
    formData.append("mobile_phone", params.mobilePhone);
    const response = await this.request.post(
      `/messenger/mobile-phone-channel/new`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async getOrCreateNewChannel(): Promise<ApiDataObjectResponse> {
    const response = await this.request.get(`/messenger/channel/me`);
    return response.data;
  }
}

export class NotificationApiService extends ApiService {
  public async getLatestNotifications({
    page = 1,
    limit = 5,
  }: {
    page?: number;
    limit?: number;
  }): Promise<ApiDataListResponse> {
    const response = await this.request.get(`/notifications`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return response.data;
  }

  public async getNotificationById({
    id,
  }: {
    id: string;
  }): Promise<ApiDataObjectResponse> {
    const response = await this.request.get(`/notifications/${id}`);
    return response.data;
  }

  public async getLastUpdateNotification(): Promise<ApiDataObjectResponse> {
    const response = await this.request.get(`/notifications/last-update`);
    return response.data;
  }
}

export class BannerApiService extends ApiService {
  public async getPinBanners(): Promise<ApiDataListResponse> {
    const response = await this.request.get(`/banners/pinned`);
    return response.data;
  }

  public async getBannerById({
    id,
  }: {
    id: string;
  }): Promise<ApiDataObjectResponse> {
    const response = await this.request.get(`/banners/${id}`);
    return response.data;
  }
}

export class BarcodeApiService extends ApiService {
  public async getQr({ code }: { code: string }): Promise<ApiTextResponse> {
    const response = await this.request.get(`/barcode/qr/${code}`);
    return response.data;
  }

  public async getCode128({
    code,
  }: {
    code: string;
  }): Promise<ApiTextResponse> {
    const response = await this.request.get(`/barcode/code128/${code}`);
    return response.data;
  }
}

export class CustomerLogApiService extends ApiService {
  public async getPointLogs({
    page = 1,
    limit = 5,
  }: {
    page?: number;
    limit?: number;
  }): Promise<ApiDataListResponse> {
    const response = await this.request.get(`/customer-logs/point-logs`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return response.data;
  }
}

export class IssuePointApiService extends ApiService {
  public async getIssuePointById({
    id,
  }: {
    id: string;
  }): Promise<ApiDataObjectResponse> {
    const response = await this.request.get(`/issue-points/${id}`);
    return response.data;
  }
}

export class WorkApiService extends ApiService {
  public async getWorks(
    page: number,
    limit: number,
    keyword?: string,
    provinceId?: string,
    date?: Date
  ): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/works`, {
      params: {
        page: page,
        limit: limit,
        keyword: keyword ?? "",
        province_id: provinceId ?? "",
        date: date?.toLocaleDateString("en-CA") ?? null,
      },
    });
    return response.data;
  }

  public async getConfirmBookings(
    workId: number,
    page: number,
    limit: number,
    dateStart?: Date,
    dateEnd?: Date
  ): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(
      `/works/${workId}/confirm-bookings`,
      {
        params: {
          page: page,
          limit: limit,
          date_start: dateStart?.toLocaleDateString("en-CA") ?? null,
          date_end: dateEnd?.toLocaleDateString("en-CA") ?? null,
        },
      }
    );
    return response.data;
  }

  public async getWorkDetail(workId: Number): Promise<ApiDataObjectResponse> {
    const response = await httpRequest.get(`/works/${workId}`);
    return response.data;
  }

  public async doLikeWork(workId: Number): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("work_id", `${workId}`);

    const response = await httpRequest.post<ApiResponse>(
      `/works/${workId}/likes`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async getLikeCount(workId: number): Promise<ApiNumberResponse> {
    const response = await httpRequest.get<ApiNumberResponse>(
      `/works/${workId}/likes/count`
    );
    return response.data;
  }

  public async doCreateNewWork(
    code: string,
    title: string,
    description: string,
    details: string[],
    provinceId: string,
    workTypeId: number,
    price: string,
    primaryImage: string,
    images: string[]
  ): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("code", code);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("details", details?.join(",") ?? "");
    formData.append("province_id", provinceId);
    formData.append("work_type_id", `${workTypeId}`);
    formData.append("province_id", provinceId);
    formData.append("price", `${price}`);
    formData.append("province_id", provinceId);
    formData.append("primary_image", primaryImage);
    formData.append("images", images?.join(",") ?? "");

    const response = await httpRequest.post(`/works`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async doBookingWork(
    workBookingFormData: WorkBookingFormData
  ): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("customer_message", workBookingFormData.customerMessage);
    formData.append("mobile_phone", workBookingFormData.mobilePhone);
    formData.append(
      "booking_date",
      moment(workBookingFormData.bookingDate).format("YYYY-MM-DD")
    );

    const response = await httpRequest.post(
      `/works/${workBookingFormData.workId}/bookings`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async doWorkerConfirmWorkBooking(
    workBookingId: number
  ): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("work_booking_id", `${workBookingId}`);
    const response = await httpRequest.post(
      `/work-bookings/${workBookingId}/worker-confirm`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async doCustomerConfirmWorkBooking(
    workBookingId: number
  ): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("work_booking_id", `${workBookingId}`);
    const response = await httpRequest.post(
      `/work-bookings/${workBookingId}/customer-confirm`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async getWorkBookingList(
    workId: number,
    pageNumber: number
  ): Promise<ApiDataListResponse> {
    const response = await httpRequest.get<ApiDataListResponse>(
      `/works/${workId}/bookings`,
      {
        params: {
          page: pageNumber,
        },
      }
    );
    return response.data;
  }
}

export class RecruitApiService extends ApiService {
  public async getRecruitDetail(
    workId: Number
  ): Promise<ApiDataObjectResponse> {
    const response = await httpRequest.get(`/recruits/${workId}`);
    return response.data;
  }

  public async doCreateNewRecruit(
    title: string,
    description: string,
    provinceId: string,
    workTypeId: string,
    budget: string,
    primaryImage: string,
    images: string[]
  ): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("province_id", provinceId);
    formData.append("work_type_id", `${workTypeId}`);
    formData.append("province_id", provinceId);
    formData.append("budget", `${budget}`);
    formData.append("province_id", provinceId);
    formData.append("primary_image", primaryImage);
    formData.append("images", images?.join(",") ?? "");

    const response = await httpRequest.post(`/recruits`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export class MeApiService extends ApiService {
  public async isLikeWork(workId: Number): Promise<ApiBooleanResponse> {
    const response = await httpRequest.get<ApiBooleanResponse>(
      `/me/work-likes/work/${workId}`
    );
    return response.data;
  }

  public async getLikeWorks(page: number): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/me/work-likes`, {
      params: {
        page: page,
        limit: 15,
      },
    });
    return response.data;
  }

  public async getNotifications(page: number): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/me/notifications`, {
      params: {
        page: page,
        limit: 15,
      },
    });
    return response.data;
  }

  public async getYourWorks(page: number): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/me/works`, {
      params: {
        page: page,
        limit: 15,
      },
    });
    return response.data;
  }

  public async getYourRecruits(page: number): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/me/recruits`, {
      params: {
        page: page,
        limit: 15,
      },
    });
    return response.data;
  }

  public async getWorkBookingList(
    pageNumber: number
  ): Promise<ApiDataListResponse> {
    const response = await httpRequest.get<ApiDataListResponse>(
      `/me/work-bookings`,
      {
        params: {
          page: pageNumber,
        },
      }
    );
    return response.data;
  }

  public async getRecruitBookingList(
    pageNumber: number
  ): Promise<ApiDataListResponse> {
    const response = await httpRequest.get<ApiDataListResponse>(
      `/me/recruit-bookings`,
      {
        params: {
          page: pageNumber,
        },
      }
    );
    return response.data;
  }
}
