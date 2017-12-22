import { Component, OnInit, Input } from '@angular/core';

const DEFAULT_DESC = `E-SPACE VN là Trung tâm đào tạo tiếng Anh trực tuyến thuộc công ty Paxcreation 100% vốn đầu tư từ Nhật Bản.
                    Đây là một trong những Trung Tâm đào tạo Tiếng Anh Trực Tuyến đầu tiên tại Việt Nam áp dụng mô hình dạy và học 1 Thầy – 1 Trò.
                    Được thành lập từ 10/2012 đến nay, E-SPACE VN đã thu hút hơn 10.000 học viên trên khắp cả nước theo học để nâng cao trình độ tiếng Anh của mình.
                    \<br\>Các khoá học của E-SPACE VN tập trung phát triển và nâng cao kĩ năng giao tiếp trong công việc cho người đi làm,
                    cũng như giúp luyện kĩ năng cho các bạn học sinh - sinh viên đang có nhu cầu tham dự các kì thi chứng chỉ như IELTS, TOIEC, TOEFL...`;

const DEFAULT_TITLE = `Chào mừng các bạn đến với E-Space Việt Nam – Học Tiếng Anh Trực Tuyến!`;

const DEFAULT_IMG = '../../assets/images/hoc-tieng-anh-moi-ngay.png';
@Component({
    selector: 'eo-intro-cell',
    templateUrl: './intro-cell.component.html',
    styleUrls: ['./intro-cell.component.scss']
})
export class IntroCellComponent implements OnInit {
    @Input() right;
    @Input() title;
    @Input() descript;
    @Input() image;
    constructor() { }
    ngOnInit() {
        this.image = this.image || DEFAULT_IMG;
        this.title = this.title || DEFAULT_TITLE;
        this.descript = this.descript || DEFAULT_DESC;
    }

}
