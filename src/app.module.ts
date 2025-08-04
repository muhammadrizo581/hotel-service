import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { RoomsModule } from "./rooms/rooms.module";
import { PrismaModule } from "./prisma/prisma.module";
import { BookingServiceModule } from "./booking-service/booking-service.module";
import { LoyaltyClientsModule } from "./loyalty-clients/loyalty-clients.module";
import { MinibarModule } from "./minibar/minibar.module";
import { RoomAmenitiesModule } from "./room-amenities/room-amenities.module";
import { HotelAmenitiesModule } from "./hotel-amenities/hotel-amenities.module";
import { StaffsModule } from "./staffs/staffs.module";
import { AdminsModule } from "./admins/admins.module";
import { DiscountsModule } from "./discounts/discounts.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { PaymentsModule } from "./payments/payments.module";
import { ServicesModule } from "./services/services.module";
import { BookingsModule } from "./bookings/bookings.module";
import { CustomersModule } from "./customers/customers.module";
import { StaffRolesModule } from "./staff-roles/staff-roles.module";
import { HotelsModule } from "./hotels/hotels.module";
import { RoomTypesModule } from "./room-types/room-types.module";
import { MailModule } from "./mail/mail.module";
import { MailService } from "./mail/mail.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    PrismaModule,
    BookingServiceModule,
    LoyaltyClientsModule,
    MinibarModule,
    RoomAmenitiesModule,
    HotelAmenitiesModule,
    StaffsModule,
    AdminsModule,
    DiscountsModule,
    ReviewsModule,
    PaymentsModule,
    ServicesModule,
    BookingsModule,
    CustomersModule,
    StaffRolesModule,
    HotelsModule,
    RoomTypesModule,
    AuthModule,
    MailModule,
  ],
  providers: [MailService],
})
export class AppModule {}
