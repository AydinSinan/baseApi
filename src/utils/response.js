class Response {
    constructor(data = null, message = null) {
        this.data = data // amaç gelen data değeriini almak
        this.message = message
    }

    success(res) { // method
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı" // eğer this.message null ya da undefined gelirse
        })
    }

    created(res) { 
        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı"
        })
    }

    error500(res) { 
        return res.status(500).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız"
        })
    }

    error400(res) { 
        return res.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız - Bad Request"
        })
    }

    error401(res) { 
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız - Unauthorized - Lütfen turum açın"
        })
    }
    error404(res) { 
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız"
        })
    }

    error429(res) { 
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "Çok Fazla İstek Atıldı"
        })
    }
}

module.exports = Response;